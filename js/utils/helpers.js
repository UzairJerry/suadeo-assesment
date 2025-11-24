// js/utils/helpers.js
export function toCSV(items){
    if(!items || items.length === 0) return '';
    const keys = ['id','name','username','email','phone','role','department','company','city','street'];
    const header = keys.join(',');
    const rows = items.map(it => keys.map(k => '"' + String(it[k]||'').replace(/"/g,'""') + '"').join(','));
    return [header, ...rows].join('\n');
}

export function download(filename, content, mime = 'text/plain'){
    const blob = new Blob([content], {type: mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
