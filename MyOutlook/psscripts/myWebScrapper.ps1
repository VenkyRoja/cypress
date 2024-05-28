
param (
    [string]$filePath = 'C:/Tutorials/MyCypress/MyOutlook',
    [string]$fileName = 'index.html'
)

$filePath
$fileName

$fpath = "$filePath/$fileName"
if (-not (Test-Path -Path $fpath)) {
    Write-Output "File not found at path: $fpath"
    Exit
}

$HTMLUri = "file:///$fpath#"
$HTMLUri
$index_page_html = Invoke-RestMethod -Uri $HTMLUri

if ($fileName -eq 'index.html') {
    $passPattern = '<b>(\d+)</b>\s+scenarios passed'
    $failPattern = '<b>(\d+)</b>\s+scenarios failed'
    $othPattern = '(\d+)</b>\s+others'
    $dtPattern = '(\d{1,2}/\d{1,2}/\d{4} \d{1,2}:\d{2}:\d{2} [AP]M)</h6>'
} else {
    $passPattern =  '(\d+)</span> test\(s\) passed</span>'
    $failPattern = '(\d+)</span> test\(s\) failed'
    $othPattern = '(\d+)</span> others'
    $dtPattern = "class='node-time'>(.*?)</span>"
}

$passMatches = $index_page_html | Select-String -Pattern $passPattern -AllMatches | ForEach-Object { $_.Matches }
$failMatches = $index_page_html | Select-String -Pattern $failPattern -AllMatches | ForEach-Object { $_.Matches }
$othMatches = $index_page_html | Select-String -Pattern $othPattern -AllMatches | ForEach-Object { $_.Matches }
$dtMatches = $index_page_html | Select-String -Pattern $dtPattern -AllMatches | ForEach-Object { $_.Matches }

# 1
if ($passMatches.Count -gt 0) {
    $passvalue = $passMatches[0].Groups[1].Value
    Write-Output "Value for 'scenarios passed': "
    $passvalue
    $passFlag = $true
} else {
    Write-Output "Pass value pattern not found in the HTML content."
    $passFlag = $false
}

# 2
if ($failMatches.Count -gt 0) {
    $failvalue = $failMatches[0].Groups[1].Value
    Write-Output "Value for 'scenarios failed': "
    $failvalue
    $failFlag = $true
} else {
    Write-Output "Fail value pattern not found in the HTML content."
    $failFlag = $false
}

# 3
if ($othMatches.Count -gt 0) {
    $othvalue = $othMatches[0].Groups[1].Value
    Write-Output "Value for 'others': "
    $othvalue
    $othFlag = $true
} else {
    Write-Output "Oth value pattern not found in the HTML content."
    $othFlag = $false
}

#4
if ($dtMatches.Count -gt 0) {
    $dtValue = $dtMatches[0].Groups[1].Value
    Write-Output "Extracted Date: "
    $dtValue
    $dtFlag = $true
} else {
    Write-Output "Date pattern not found in the HTML content."
    $dtFlag = $false
}

if (($passFlag -eq $true) -and ($failFlag -eq $true) -and ($othFlag -eq $true) -and ($dtFlag -eq $true)) {
    Write-Output "Success"
} else {
    Write-Output "Error"
}
