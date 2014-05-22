grunt task .po to .js
========

Running

```sh
  grunt po_to_js
```

or included in any other task

Gruntfile.js

```sh
  grunt.initConfig({
      ...
      po_to_js: {
            berry: {
                files: [{
                    cwd: '<%= yeoman.app %>/texts-locale',
                    src: '{,*/}*.po',
                    dest: '.tmp/scripts',
                    ext: '.js',
                    expand: true,
                    template: 'tasks/berry-po-to-js-template.html'
                }]
            }
        },
    },
    ...
  });
       
```

example .po file

```sh
#  blocks/registration:validators email pattern
msgctxt "blocks/registration:validators:email:pattern"
msgid "Некорректный email"
msgstr "Hm, that email address is invalid. Try again?"

#  blocks/restore-password:validators email pattern
msgctxt "blocks/restore-password:validators:email:pattern"
msgid "Некорректный email"
msgstr "Incorrect email"

#  blocks/login:validators password required
msgctxt "blocks/login:validators:password:required"
msgid "Введите пароль"
msgstr "Enter password"

#  blocks/registration:validators password required
msgctxt "blocks/registration:validators:password:required"
msgid "Введите пароль"
msgstr "Enter password"

#  blocks/login:validators password rangeLength
msgctxt "blocks/login:validators:password:rangeLength"
msgid "Длина пароля от 6 до 18 знаков"
msgstr "Password must be 6 to 18 characters"

#  blocks/registration:validators password rangeLength
msgctxt "blocks/registration:validators:password:rangeLength"
msgid "Длина пароля от 6 до 18 знаков"
msgstr "Password must contain 6 to 18 characters"
```


return 
```sh
json = {
  "article-head": {
    "en": {
      "tags":"Tags",
      "empty_categories":"No categories",
      ...
      },
    "ru": {
      "tags":"Теги",
      "empty_categories":"У данной идеи нет категорий",
      ...
    }
  },
  ...
  "registration": { 
    "en": { 
      "validators": { 
          "email": {
            "pattern": "Hm, that email address is invalid. Try again?",
            "required": "Please enter your email address"
          },
          "password": {
            "rangeLength": "Your name must be at least 3 characters",
            "required": "Please enter your name"
        },
        ...
      },
      "registration": "Sign Up",
      "name_placeholder": "Type your name",
      "name_title": "Full Name",
      "name_tooltip": "This Name will be displayed on iknow.travel",
      ...
     },
     ...
  },
  ...

}
```
    