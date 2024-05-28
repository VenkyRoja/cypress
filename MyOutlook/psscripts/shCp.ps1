
param (
        [string]$SrcFile
)

$SrcFolder = 'C:\Tutorials\MyCypress\MyOutlook\cypress\downloads'
$destFolder = "C:\Users\vp101121\harriscomputer\R & D Archive - QA Team\Products\QA Automation"

$SrcPath = Join-Path -Path $SrcFolder -ChildPath $SrcFile

if (Test-Path $SrcPath -PathType Leaf) {
    $destPath = Join-Path -Path $DestFolder -ChildPath $SrcFile
    
    #$SrcPath
    #$destPath
    
    Copy-Item -Path "$SrcPath" -Destination "$destPath" -Force
    Write-Host "File  $SrcFile  is copied successfully."
} else {
    Write-Output "Source file not found."
}