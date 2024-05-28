$fileName = "Report_12"
$fileExtension = ".zip"

for ($i = 0; $i -lt 26; $i++) {
    $counter = [char](97 + $i)
    $newFileName = "{0}{1}{2}" -f $fileName, $counter, $fileExtension
    Write-Output $newFileName
}
