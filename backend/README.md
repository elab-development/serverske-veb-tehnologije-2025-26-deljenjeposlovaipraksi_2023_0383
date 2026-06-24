# Karijera.rs — Backend API

REST API za platformu za oglašavanje i prijavu na poslove. Omogućava registraciju i
prijavu korisnika (tražioci posla, kompanije, administratori), upravljanje profilima,
objavljivanje i pretragu oglasa za posao, prijavljivanje na oglase i administraciju
sistema.

Backend je rađen u Laravel-u i komunicira sa React frontend-om preko HTTP/JSON REST
API-ja.

## Tehnologije

- **PHP** ^8.2
- **Laravel** ^12.0
- **Laravel Sanctum** — autentikacija putem API tokena
- **MySQL** — relaciona baza podataka
- **Abstract API** — eksterna validacija email adrese prilikom registracije

## Struktura projekta

```
app/Http/Controllers/      kontroleri (Auth, JobListing, JobSeeker, Company, Application, Admin, User)
app/Http/Resources/        API Resource klase za serijalizaciju odgovora
app/Models/                Eloquent modeli (User, JobSeeker, Company, JobListing, Application, Admin)
database/migrations/       struktura baze podataka
database/factories/        fabrike za generisanje test podataka
database/seeders/          seederi za popunjavanje baze (po jedan seeder za svaki model)
routes/api.php             definicije API ruta
swagger.yaml                OpenAPI/Swagger specifikacija API-ja
```

## Modeli i relacije

- `User` 1—0..1 `JobSeeker` / 1—0..1 `Company` (zavisno od role korisnika)
- `Company` 1—0..* `JobListing`
- `JobSeeker` 1—0..* `Application`
- `JobListing` 1—0..* `Application`

Role korisnika: `job_seeker`, `company`, `admin`.

## Instalacija

1. Instaliraj zavisnosti:
   ```bash
   composer install
   ```

2. Kreiraj `.env` fajl na osnovu `.env.example` i podesi konekciju na bazu:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   Podesiti u `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=backend
   DB_USERNAME=root
   DB_PASSWORD=

   ABSTRACT_API_KEY=<svoj API ključ sa abstractapi.com>
   ```

3. Pokreni migracije:
   ```bash
   php artisan migrate
   ```

4. Popuni bazu test podacima (pokreće sve seedere redom: `UserSeeder`, `JobSeekerSeeder`,
   `CompanySeeder`, `JobListingSeeder`, `ApplicationSeeder`):
   ```bash
   php artisan db:seed
   ```

5. Pokreni razvojni server:
   ```bash
   php artisan serve
   ```

API je dostupan na `http://localhost:8000/api`.

## Autentikacija

Prijava (`/api/login`) i registracija (`/api/register`) vraćaju Sanctum pristupni token.
Token se šalje u zaglavlju za sve zaštićene rute:

```
Authorization: Bearer {access_token}
```

## API dokumentacija

Kompletna specifikacija svih endpoint-a (parametri, zaglavlja, format odgovora) nalazi se
u [`swagger.yaml`](swagger.yaml). Može se importovati na [editor.swagger.io](https://editor.swagger.io)
za interaktivan pregled, ili lokalno generisati statičku HTML dokumentaciju:

```bash
npx @redocly/cli build-docs swagger.yaml
```

## Pregled glavnih ruta

| Metoda | Ruta                                 | Opis                                  | Pristup           |
|--------|---------------------------------------|----------------------------------------|--------------------|
| POST   | `/register`                           | Registracija korisnika                 | Javno              |
| POST   | `/login`                               | Prijava korisnika                      | Javno              |
| GET    | `/job-listings`                       | Lista oglasa (sa filterima)            | Javno              |
| GET    | `/job-listings/search`                | Pretraga oglasa                        | Javno              |
| GET    | `/job-seeker/profile`                 | Profil tražioca posla                  | job_seeker         |
| POST   | `/job-seeker/applications`            | Prijava na oglas                       | job_seeker         |
| GET    | `/company/profile`                    | Profil kompanije                       | company            |
| POST   | `/company/job-listings`               | Kreiranje oglasa                       | company            |
| PUT    | `/company/applications/{id}`          | Izmena statusa prijave                 | company            |
| GET    | `/admin/users`                        | Lista svih korisnika                   | admin              |

Detaljan spisak svih ruta: [`routes/api.php`](routes/api.php).

## Dijagrami

- [`dijagram-komponenti.drawio`](dijagram-komponenti.drawio) — arhitektura aplikacije
- [`dijagram-klasa.drawio`](dijagram-klasa.drawio) — dijagram klasa (modeli i relacije)

Otvaraju se na [app.diagrams.net](https://app.diagrams.net) (File → Open from → Device).
