param (
    [Parameter(Mandatory=$true)]
    [string]$SourceFilePath,

    [Parameter(Mandatory=$true)]
    [string]$SourceFileName
)

$sourceFullPath = Join-Path -Path $SourceFilePath -ChildPath $SourceFileName

if (-Not (Test-Path -Path $sourceFullPath)) {
    Write-Output "Error"
    Write-Output "Source file '$SourceFileName' does not exist."
    exit 
}

try {
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($SourceFileName)
    $fileExtension = [System.IO.Path]::GetExtension($SourceFileName)
    $suffix = "_old"
       
    $newFileName = "{0}{1}{2}" -f $fileName, $suffix, $fileExtension

    $destinationFullPath = Join-Path -Path $SourceFilePath -ChildPath $newFileName

    Copy-Item -Path $sourceFullPath -Destination $destinationFullPath

    Write-Output "Success"
    Write-Output "Report file copied to: $destinationFullPath"

} catch {
    Write-Output "Error"
    Write-Error "Error while copying the report file: $_"
}
