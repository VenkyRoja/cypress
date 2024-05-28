param (
    [Parameter(Mandatory=$true)]
    [string]$runDate,

    [Parameter(Mandatory=$true)]
    [string]$zipFilePath
)

$baseFolder = 'C:\Users\vp101121\harriscomputer\R & D Archive - QA Team\Products\QA Automation\CIS V5\Test Reports'

$currentYear = (Get-Date).Year

$executionDay = $runDate.Split(' ')[0]
$executionMonth = $runDate.Split(' ')[1]

$executionMonthNumber = [datetime]::ParseExact($executionMonth, 'MMM', $null).Month

$monthFolderName = "{0:D2} {1}" -f $executionMonthNumber, $executionMonth

$yearFolder = Join-Path -Path $baseFolder -ChildPath $currentYear
$monthFolder = Join-Path -Path $yearFolder -ChildPath $monthFolderName
$executionFolder = Join-Path -Path $monthFolder -ChildPath "\Performance $executionMonth $executionDay $currentYear"

if (Test-Path -Path $executionFolder) {
    Write-Output "Folder already exists: $executionFolder"
} else {
    New-Item -Path $executionFolder -ItemType Directory -Force
    Write-Output "Folder created: $executionFolder"
}

#-------------------------------------------
$destinationZipPath = Join-Path -Path $executionFolder -ChildPath (Split-Path -Leaf $zipFilePath)
$i = 0

if (-Not(Test-Path -Path $destinationZipPath)) {
    $newFileName = $zipFilePath
} else {
    while (Test-Path -Path $destinationZipPath) {
        $fileName = [System.IO.Path]::GetFileNameWithoutExtension($zipFilePath)
        $fileExtension = [System.IO.Path]::GetExtension($zipFilePath)
        $counter = [char](97 + $i)
        $newFileName = "{0}{1}{2}" -f $fileName, $counter, $fileExtension
        $destinationZipPath = Join-Path -Path $executionFolder -ChildPath $newFileName
        $i++
    }
}

Copy-Item -Path $zipFilePath -Destination $destinationZipPath -Force
Write-Output "Zip file copied to: $destinationZipPath"
   
$zipFileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($newFileName)
$extractionFolder = Join-Path -Path $executionFolder -ChildPath $zipFileNameWithoutExtension
New-Item -Path $extractionFolder -ItemType Directory -Force
Write-Output "Extraction folder created: $extractionFolder"

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($destinationZipPath, $extractionFolder)
Write-Output "Zip file extracted to: $extractionFolder"

