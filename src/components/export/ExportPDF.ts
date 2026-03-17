export function exportPDF() {
  const source = document.getElementById('resume-preview')
  if (!source) return

  const clone = source.cloneNode(true) as HTMLElement
  clone.id = '__print-clone__'
  clone.style.cssText = 'position:fixed;inset:0;z-index:9999;background:white;overflow:auto;'
  document.body.appendChild(clone)

  const style = document.createElement('style')
  style.id = '__print-style__'
  style.textContent = `
    @media print {
      body > *:not(#__print-clone__) { display: none !important; }
      #__print-clone__ { position: static !important; box-shadow: none !important; }
      @page { size: A4; margin: 0; }
    }
  `
  document.head.appendChild(style)

  window.print()

  document.body.removeChild(clone)
  document.head.removeChild(style)
}
