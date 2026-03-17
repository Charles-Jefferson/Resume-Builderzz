export function exportHTML(name: string) {
  const el = document.getElementById('resume-preview')
  if (!el) return

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name || 'Resume'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, "Times New Roman", serif; background: #fff; }
    @page { size: A4; margin: 0; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  ${el.innerHTML}
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name || 'resume'}.html`
  a.click()
  URL.revokeObjectURL(url)
}
