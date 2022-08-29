<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Wordhunt API

Simple and powerfull API to build your own language learning system.

### Key points

-   User authentication with access token and refresh token
-   Separation of concept for admin and client users
-   Database seeders
-   Tests
-   Endpoints that allow to change word statuses

#### Word status management

1. Each client can register and add words he wants to learn (Word will change status to "new").
2. Then client need to activate words for exercises. (Selected words will change status to "in_progress")
3. After user correctly finished exercise frontend side will send a request to increase word level (Word will be updated in database with level+1, maximum level is 6, when word reaches this level it's status will change to "learned")
4. Additionally client can `skip` some words that he already knows or not interested to learn anymore (Word will change status to "skipped").

### Database structure

Currently database is aligned to store one language and it's translations + examples.

#### Schema

<p align="center">
<a href="https://raw.githubusercontent.com/IvanDanylenko/wordhunt/master/backend/docs/database.png" target="_blank"><img src="https://raw.githubusercontent.com/IvanDanylenko/wordhunt/master/backend/docs/database.png" width="800"></a>
</p>

### Openapi Specification

Please check [Client API](https://github.com/IvanDanylenko/wordhunt/blob/master/backend/docs/openapi/client-api.yml) and [Admin API](https://github.com/IvanDanylenko/wordhunt/blob/master/backend/docs/openapi/admin-api.yml).

For convenience you can use [swagger editor](https://editor.swagger.io).
