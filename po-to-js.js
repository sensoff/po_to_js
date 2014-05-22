module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('po_to_js', 'Generate texts-locale.js from *.po',
        function() {
            var mas = {};
            this.files.forEach(function(file) {
                var open_file = grunt.file.read(file.src);
                var lines = open_file.split('\n');
                var start = null;
                var keys = [];
                var locale = file.dest.replace('.tmp/scripts/', '');
                var last_locale = null;
                locale = locale.replace('/texts-locale.js', '');

                var generateObject = function(keys, obj_locale) {
                    for (var i=1, link_locale = obj_locale; i<keys.length; i++) {
                        if (!link_locale[keys[i]]) {
                            if (i === keys.length-1) {
                                link_locale[keys[i]] = '';
                            } else {
                                link_locale[keys[i]] = {};
                            }
                        }
                        link_locale = link_locale[keys[i]];
                    }
                };

                var setObjectParams = function(keys, obj, value) {
                    for (var i=1, link = obj; i<keys.length-1; i++) {
                        link = link[keys[i]];
                        if (i === keys.length-2) {
                            link[keys[i+1]] += value;
                        }
                    }
                };

                lines.forEach(function(line) {
                    if (/^#(\s)*start/.test(line)) {
                        start = true;
                        return;
                    }
                    if (!start) {
                        return;
                    }

                    var convert_line = line.replace(/(^\s+|\s+$)/g, '');

                    if (/^msgctxt/.test(convert_line)) {
                        convert_line = convert_line.replace('msgctxt "elements/', '');
                        convert_line = convert_line.replace('msgctxt "blocks/', '');
                        keys = convert_line.replace(/"$/,'').split(':');
                        if (!mas[keys[0]]) {
                            mas[keys[0]] = {};
                        }
                        if (!mas[keys[0]][locale]) {
                            mas[keys[0]][locale] = {};
                        }
                        if (keys.length > 2) {
                            generateObject(keys, mas[keys[0]][locale]);
                        }
                    }

                    if (/^msgstr/.test(convert_line)) {
                        convert_line = convert_line.replace('msgstr ', '').replace(/^"/,'').replace(/"$/,'');
                        if (!convert_line) {
                            convert_line = '';
                        }
                        if (keys.length > 2) {
                            setObjectParams(keys, mas[keys[0]][locale], convert_line);
                        } else {
                            mas[keys[0]][locale][keys[1]] = convert_line;
                        }
                        last_locale = locale;
                    }

                    if (/^"/.test(convert_line)) {
                        convert_line = convert_line.replace(/^"/,'').replace(/"$/,'');
                        if (!convert_line) {
                            convert_line = '';
                        }
                        if (keys.length > 2) {
                            setObjectParams(keys, mas[keys[0]][last_locale], convert_line);
                        } else {
                            mas[keys[0]][last_locale][keys[1]] += convert_line;
                        }
                    }
                });
            });

            var output_file = this.files[this.files.length-1].dest;
            var template = grunt.file.read(this.files[0].template);
            var obj = {
                template: template,
                json: JSON.stringify(mas)
            };
            grunt.file.write(output_file, grunt.template.process('<%= template %>', {data: obj}));
            console.log('File "' + output_file + '" created.');
        }
    );
};

