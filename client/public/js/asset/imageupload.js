import $ from 'jquery';

const path = require('path');

$(document).ready(() => {
  const _URL = window.URL || window.webkitURL;
  let file, img;

  $('#file').change(function () {
    file = $(this)[0].files[0];

    img = new Image();
    let imgwidth = 0;
    let imgheight = 0;
    const maxwidth = 640;
    const maxheight = 640;

    img.src = _URL.createObjectURL(file);
    img.onload = function () {
      imgwidth = this.width;
      imgheight = this.height;

      $('#width').text(imgwidth);
      $('#height').text(imgheight);
      if (imgwidth <= maxwidth && imgheight <= maxheight) {
        const formData = new FormData();
        formData.append('fileToUpload', $('#file')[0].files[0]);

        $.ajax({
          url: path.join(__dirname, '/client/public/js/asset'),
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          dataType: 'json',
          success(response) {
            if (response.status == 1) {
              $('#prev_img').attr('src', `upload/${response.returnText}`);
              $('#prev_img').show();
              $('#response').text('Upload successfully');
            } else {
              $('#response').text(response.returnText);
            }
          }
        });
      } else {
        $('#response').text(`Image size must be ${maxwidth}X${maxheight}`);
      }
    };
    img.onerror = function () {
      $('#response').text(`not a valid file: ${file.type}`);
    };
  });
});
