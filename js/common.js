$(document).ready(function () {
    var canvas = document.getElementById('draw'),
        context = canvas.getContext('2d'),
        color = '#000000',
        pixel_size = 10,
        canvas_width = canvas.width,
        canvas_height = canvas.height;

    $('#draw').mousedown(function (e) {
        e.preventDefault();
        position = getPosition(e);

        var cx = (Math.floor(position.x / pixel_size) * pixel_size),
            cy = (Math.floor(position.y / pixel_size) * pixel_size);

        if (position.x + pixel_size > canvas_width) {
            cx = canvas_width - pixel_size;
        }
        if (position.y + pixel_size > canvas_height) {
            cy = canvas_height - pixel_size;
        }
        if (e.ctrlKey || e.metaKey) {
            drawPixel(cx, cy, null, true);
        } else {
            drawPixel(cx, cy, color);
        }
    });

    $('#clear-all').on('click', function (e) {
        e.preventDefault();
        context.clearRect(0, 0, canvas_width, canvas_height);
    });

    $('#generate-code').on('click', function (e) {
        e.preventDefault();

        var shadow = [],
            min_width = canvas_width,
            min_height = canvas_height,
            max_width = 0,
            max_height = 0;

        for (var i = 0; i < canvas_height; i += pixel_size) {
            for (var j = 0; j < canvas_width; j += pixel_size) {
                var data = context.getImageData(j, i, pixel_size, pixel_size).data;
                if (data[0] != 255 && data[1] != 255 && data[2] != 255 && data[3] != 0) {
                    if ((j + pixel_size) < min_width) {
                        min_width = (j + pixel_size);
                    }
                    if ((i + pixel_size) < min_height) {
                        min_height = (i + pixel_size);
                    }
                    if ((j + (pixel_size * 2)) > max_width) {
                        max_width = (j + (pixel_size * 2));
                    }
                    if ((i + (pixel_size * 2)) > max_height) {
                        max_height = (i + (pixel_size * 2));
                    }
                    shadow.push((j + pixel_size) + 'px ' + (i + pixel_size) + 'px #' + (data[2] | (data[1] << 8) | (data[0] << 16) | (1 << 24)).toString(16).slice(1));
                }
            }
        }
        shadow = shadow.join(',\n\t\t');

        $('#drawing .pixels').css({
            'display': 'block',
            'width': pixel_size,
            'height': pixel_size,
            'margin': '-' + min_height + 'px ' + max_width + 'px ' + max_height + 'px -' + min_width + 'px',
            'box-shadow': shadow
        });

        $('#output').val('.pixels {\n\tdisplay: block;\n\twidth: ' + pixel_size + 'px;\n\theight: ' + pixel_size + 'px;\n\tmargin: -' + min_height + 'px ' + max_width + 'px ' + max_height + 'px -' + min_width + 'px;\n\tbox-shadow: \n\t\t' + shadow + ';\n\}');
    });

    function drawPixel(x, y, color, clear) {
        if (clear == null) clear = false;
        context.fillStyle = color;
        if (clear) {
            context.clearRect(x, y, pixel_size, pixel_size);
        } else {
            context.fillRect(x, y, pixel_size, pixel_size);
        }
    }

    function getPosition(e) {
        var targ;
        if (!e) {
            e = window.event;
        }
        if (e.target) {
            targ = e.target;
        } else if (e.srcElement) {
            targ = e.srcElement;
        }
        if (targ.nodeType == 3) {
            targ = targ.parentNode;
        }
        var x = Math.floor(e.pageX - $(targ).offset().left);
        var y = Math.floor(e.pageY - $(targ).offset().top);

        return {
            "x": x,
            "y": y
        };
    };

    buildGrids(pixel_size, "#eee", (pixel_size * 5));
});