$file = "server.js"
$content = Get-Content $file -Raw

if ($content -notmatch 'reportRoutes') {
    $content = $content.Replace(
        'const landRoutes = require("./routes/land.routes");',
        'const landRoutes = require("./routes/land.routes");' + "`r`n" +
        'const reportRoutes = require("./routes/report.routes");'
    )

    $content = $content.Replace(
        'app.use("/api/lands", landRoutes);',
        'app.use("/api/lands", landRoutes);' + "`r`n" +
        'app.use("/api/reports", reportRoutes);'
    )

    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "Report API connected!"
} else {
    Write-Host "Report API already connected."
}
