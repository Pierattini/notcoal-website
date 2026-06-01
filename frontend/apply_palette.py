from pathlib import Path
import re
root = Path('src')
vars_file = root / 'styles' / 'base' / 'variables.css'
vars_file.write_text('''
:root {
  --color-graphite: #333333;
  --color-green: #1D5248;
  --color-cream: #F5F3EF;

  --background: var(--color-graphite);
  --background-secondary: #292929;

  --text-light: var(--color-cream);
  --text-dark: var(--color-graphite);
  --text-secondary: rgba(51,51,51,0.72);

  --primary: var(--color-green);
  --primary-hover: #155c4f;

  --border-color: rgba(245,243,239,0.18);
}
''')

def replace_all(path, patterns):
    text = path.read_text(encoding='utf-8')
    orig = text
    for pat, repl in patterns:
        text = re.sub(pat, repl, text, flags=re.MULTILINE)
    if text != orig:
        path.write_text(text, encoding='utf-8')
        print('updated', path)

# Rewrite globals.css with corporate text and heading rules while preserving imports
globals_path = root / 'app' / 'globals.css'
original = globals_path.read_text(encoding='utf-8')
new_global = '''@import "../styles/globals.css";

:root {
  --color-graphite: #333333;
  --color-green: #1D5248;
  --color-cream: #F5F3EF;

  --background: var(--color-graphite);
  --background-secondary: #292929;

  --text-light: var(--color-cream);
  --text-dark: var(--color-graphite);
  --text-secondary: rgba(51,51,51,0.72);
}

html {
  font-size: 12px;
  scroll-behavior: smooth;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--background);
  color: var(--text-light);
  font-family: Inter, Arial, Helvetica, sans-serif;
  overflow-x: hidden;
  zoom: 0.75;
}

main {
  width: 100%;
  overflow: hidden;
}

section {
  width: 100%;
}

img {
  max-width: 100%;
  display: block;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--color-graphite);
}
'''
if original != new_global:
    globals_path.write_text(new_global, encoding='utf-8')
    print('rewrote', globals_path)

patterns = [
    (r'background:\s*#ffffff;', 'background: var(--color-cream);'),
    (r'background:\s*white;', 'background: var(--color-cream);'),
    (r'background:\s*#f3f0ea;', 'background: var(--color-cream);'),
    (r'background:\s*#f5f3ee;', 'background: var(--color-cream);'),
    (r'background:\s*#f5f7fb;', 'background: var(--color-cream);'),
    (r'background:\s*#f9fafb;', 'background: var(--color-cream);'),
    (r'background:\s*#f8fbff;', 'background: var(--color-cream);'),
    (r'background:\s*#050816;', 'background: var(--color-graphite);'),
    (r'background:\s*#08111f;', 'background: var(--color-graphite);'),
    (r'background:\s*#0b1120;', 'background: var(--color-graphite);'),
    (r'background:\s*#020617;', 'background: var(--color-graphite);'),
    (r'background:\s*#031225;', 'background: var(--color-graphite);'),
    (r'background:\s*rgba\(5,\s*8,\s*22,(.*?)\)', r'background: rgba(51,51,51,\1)'),
    (r'background:\s*rgba\(3,\s*7,\s*18,(.*?)\)', r'background: rgba(51,51,51,\1)'),
    (r'background:\s*rgba\(2,\s*6,\s*23,(.*?)\)', r'background: rgba(51,51,51,\1)'),
    (r'background:\s*rgba\(0,\s*0,\s*0,(.*?)\)', r'background: rgba(51,51,51,\1)'),
    (r'background:\s*rgba\(255,255,255,(.*?)\)', r'background: rgba(245,243,239,\1)'),
    (r'border:\s*1px solid rgba\(255,255,255,(.*?)\)', r'border: 1px solid rgba(245,243,239,\1)'),
    (r'border-color:\s*rgba\(255,255,255,(.*?)\)', r'border-color: rgba(245,243,239,\1)'),
    (r'background:\s*linear-gradient\(\s*135deg,\s*#0ea5e9.*?\);', 'background: var(--color-green);'),
    (r'background:\s*linear-gradient\(\s*135deg,\s*#22c55e.*?\);', 'background: var(--color-green);'),
    (r'background:\s*linear-gradient\(\s*135deg,\s*#0ea5e9,\s*#2563eb\s*\)', 'background: var(--color-green);'),
    (r'background:\s*linear-gradient\(\s*135deg,\s*#ef4444.*?\);', 'background: rgba(255, 99, 99, 0.98);'),
    (r'background:\s*linear-gradient\(\s*135deg,\s*rgba\(34,197,94,(.*?)\),\s*rgba\(14,165,233,(.*?)\)\)', r'background: rgba(29,82,72,\1);'),
    (r'background:\s*linear-gradient\(\s*135deg,\s*rgba\(14,165,233,(.*?)\),\s*transparent\s*\)', r'background: rgba(29,82,72,\1);'),
    (r'background:\s*linear-gradient\(\s*rgba\(14,165,233,(.*?)\),\s*transparent\s*\)', r'background: rgba(29,82,72,\1);'),
    (r'background:\s*linear-gradient\(\s*rgba\(34,197,94,(.*?)\),\s*rgba\(14,165,233,(.*?)\)\s*\)', r'background: rgba(29,82,72,\1);'),
    (r'color:\s*#08111f;', 'color: var(--color-graphite);'),
    (r'color:\s*#0f172a;', 'color: var(--color-graphite);'),
    (r'color:\s*#111827;', 'color: var(--color-graphite);'),
    (r'color:\s*#334155;', 'color: var(--text-secondary);'),
    (r'color:\s*#44526b;', 'color: var(--text-secondary);'),
    (r'color:\s*#64748b;', 'color: var(--text-secondary);'),
    (r'color:\s*#94a3b8;', 'color: var(--text-secondary);'),
    (r'color:\s*#cbd5e1;', 'color: var(--text-secondary);'),
    (r'color:\s*#6b7280;', 'color: var(--text-secondary);'),
    (r'color:\s*#475569;', 'color: var(--text-secondary);'),
    (r'color:\s*#999;', 'color: var(--text-secondary);'),
    (r'color:\s*#22c55e;', 'color: var(--color-green);'),
    (r'color:\s*#4ade80;', 'color: var(--color-green);'),
    (r'color:\s*#0ea5e9;', 'color: var(--color-green);'),
    (r'color:\s*#ef4444;', 'color: rgba(255, 99, 99, 1);'),
    (r'border-left:\s*4px solid #22c55e;', 'border-left: 4px solid var(--color-green);'),
    (r'background:\s*#22c55e;', 'background: var(--color-green);'),
    (r'background:\s*#16a34a;', 'background: var(--color-green);'),
    (r'background:\s*rgba\(34,197,94,(.*?)\)', r'background: rgba(29,82,72,\1)'),
    (r'border-color:\s*rgba\(14,165,233,(.*?)\)', r'border-color: rgba(29,82,72,\1)'),
    (r'border-color:\s*rgba\(34,197,94,(.*?)\)', r'border-color: rgba(29,82,72,\1)'),
    (r'box-shadow:\s*0 18px 40px rgba\(37,99,235,(.*?)\)', r'box-shadow: 0 18px 40px rgba(29,82,72,\1)'),
    (r'box-shadow:\s*0 24px 50px rgba\(37,99,235,(.*?)\)', r'box-shadow: 0 24px 50px rgba(29,82,72,\1)'),
]
for path in root.rglob('*'):
    if path.suffix.lower() in {'.css', '.ts', '.tsx'}:
        replace_all(path, patterns)

tsx_replacements = {
    "background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'": "background: 'var(--color-green)'",
    "background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'": "background: 'rgba(255, 99, 99, 0.98)'",
    "color: '#a0aec0'": "color: 'var(--text-secondary)'",
    "color: '#0ea5e9'": "color: 'var(--color-green)'",
    "color: '#22c55e'": "color: 'var(--color-green)'",
    "background: 'rgba(14, 165, 233, 0.1)'": "background: 'rgba(29,82,72,0.1)'",
    "border: '1px solid rgba(16, 185, 129, 0.3)'": "border: '1px solid rgba(29,82,72,0.3)'",
    "boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'": "boxShadow: '0 4px 12px rgba(29,82,72,0.15)'",
    "border: '1px solid rgba(239, 68, 68, 0.3)'": "border: '1px solid rgba(255, 99, 99, 0.3)'",
    "boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'": "boxShadow: '0 4px 12px rgba(255, 99, 99, 0.15)'",
    "background: 'rgba(14, 165, 233, 0.03)'": "background: 'rgba(29,82,72,0.03)'",
    "border: '2px dashed rgba(14, 165, 233, 0.5)'": "border: '2px dashed rgba(29,82,72,0.5)'",
    "background: 'rgba(255, 255, 255, 0.05)'": "background: 'rgba(245,243,239,0.05)'",
    "color: '#ef4444'": "color: 'rgba(255, 99, 99, 1)'",
}
for path in root.rglob('*'):
    if path.suffix.lower() in {'.tsx', '.ts'}:
        text = path.read_text(encoding='utf-8')
        orig = text
        for old, new in tsx_replacements.items():
            text = text.replace(old, new)
        if text != orig:
            path.write_text(text, encoding='utf-8')
            print('updated tsx', path)
