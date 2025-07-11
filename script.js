const fileInput = document.getElementById('file');
const formatSelect = document.getElementById('format');
const convertBtn = document.getElementById('convert');
const downloadLink = document.getElementById('download');
const preview = document.getElementById('preview');

let image = null;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = () => {
            image = img;
            preview.src = event.target.result;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

convertBtn.addEventListener('click', () => {
    if (!image) return alert("Выберите изображение");

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const format = formatSelect.value;
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `converted.${format}`;
        downloadLink.style.display = 'inline-block';
    }, `image/${format}`);
});