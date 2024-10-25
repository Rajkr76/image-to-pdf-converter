function convertToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let input = document.getElementById('imageInput');
    if (input.files.length === 0) {
        alert('Please select at least one image.');
        return;
    }

    let promises = [];
    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();

        promises.push(new Promise((resolve) => {
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function() {
                    const width = img.width;
                    const height = img.height;

                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();

                    // Fit the image within the PDF page, maintaining aspect ratio
                    const scaleFactor = Math.min(pageWidth / width, pageHeight / height);

                    const scaledWidth = width * scaleFactor;
                    const scaledHeight = height * scaleFactor;

                    doc.addImage(img, 'JPEG', 0, 0, scaledWidth, scaledHeight);

                    if (i < input.files.length - 1) {
                        doc.addPage();
                    }
                    resolve();
                };
            };
            reader.readAsDataURL(file);
        }));
    }

    Promise.all(promises).then(() => {
        doc.save("converted.pdf");
    });
}

        if (window.innerWidth < 1024) {
            document.querySelector("meta[name=viewport]").setAttribute("content", "width=1024");
        }
   
