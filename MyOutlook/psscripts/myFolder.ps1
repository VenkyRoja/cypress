param (
    [Parameter(Mandatory=$true)]
    [string]$baseFolder,
    
    [Parameter(Mandatory=$false)]
    [datetime]$currentDate = (Get-Date)
)

if (-Not (Test-Path -Path $baseFolder)) {
    Write-Output "Base folder '$baseFolder' does not exist. Exiting script."
    return 'Error'
}

$currentMonth = $currentDate.ToString("MM MMMM")

$targetFolder = Join-Path -Path $baseFolder -ChildPath $currentMonth

if (-Not (Test-Path -Path $targetFolder)) {
    New-Item -ItemType Directory -Path $targetFolder
    Write-Output "Folder '$targetFolder' created successfully."
} else {
    Write-Output "Folder '$targetFolder' already exists."
}

return $targetFolder
