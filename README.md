# Overview #
This is a small node.js / express / jade application that enables an end user to upload an animated gif image file and download the individual split frames of that gif file as jpeg image frames within a zip archive in a single action.

This application was developed on Linux Mint 17.1 with Visual Studio Code, the cross platform code editor from Microsoft. This application has been tested locally on Linux Mint 17.1 and also uploaded to AWS via ElasticBeanstalk and tested on an EC2 instance.

# AWS Live Host #
~~[http://splitgif-dev.elasticbeanstalk.com/](http://splitgif-dev.elasticbeanstalk.com/)~~ Currently offline.

# Dependencies #

```
#!json

"dependencies": {
    "archiver": "^0.14.3",
    "body-parser": "~1.12.0",
    "concat-frames": "^1.0.3",
    "cookie-parser": "~1.3.4",
    "debug": "~2.1.1",
    "express": "~4.12.2",
    "gm": "^1.17.0",
    "jade": "~1.9.2",
    "mmmagic": "^0.3.14",
    "morgan": "~1.5.1",
    "multer": "^0.1.8",
    "serve-favicon": "~2.2.0"
  }

```
ImageMagick installed on the host: http://www.imagemagick.org/