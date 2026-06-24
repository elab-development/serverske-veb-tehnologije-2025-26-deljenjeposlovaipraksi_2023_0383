# KarijeraHub — Backend API

REST API platforma za pretragu poslova i stručnih praksi 
razvijena u Laravel-u.

## Pokretanje projekta

1. Kloniraj repozitorijum:
```bash
   git clone https://github.com/elab-development/serverske-veb-tehnologije-2025-26-deljenjeposlovaipraksi_2023_0383
   cd backend
```

2. Instaliraj zavisnosti:
```bash
   composer install
```

3. Kreiraj `.env` fajl i podesi bazu:
```bash
   cp .env.example .env
   php artisan key:generate
```

4. U `.env` fajlu podesi:

DB_DATABASE=backend
DB_USERNAME=root
DB_PASSWORD=
ABSTRACT_API_KEY=tvoj_api_kljuc

5. Pokreni migracije i seedere:
```bash
   php artisan migrate
   php artisan db:seed
```

6. Pokreni server:
```bash
   php artisan serve
```

API je dostupan na `http://localhost:8000/api`.

## Funkcionalnosti

- Registracija i prijava korisnika sa tri uloge: 
  kandidat, kompanija i administrator
- Validacija email adrese putem Abstract API-ja
- Upravljanje profilima kandidata i kompanija
- Kreiranje, pregled, izmena i brisanje oglasa za posao
- Prijavljivanje kandidata na oglase
- Pretraga i filtriranje oglasa po ključnoj reči, 
  lokaciji, tipu i nivou iskustva
- Paginacija rezultata
- Izmena lozinke
- Admin panel za upravljanje korisnicima, oglasima 
  i prijavama