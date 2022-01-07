# Story API
API ini digunakan hanya untuk keperluan kelas Dicoding Academy.

## Cara menjalankan secara lokal
1. Instal [Node.js](https://nodejs.org/en/)
2. Clone [GitHub Repository Ini](https://github.com/dicodingacademy/story-api.git) atau unduh zip file tersebut.
3. Masuk ke dalam folder proyek.
4. Di dalam folder proyek:
    - Buat file `.env` dan `.test.env` dengan isi:
    ```dotenv
       APP_HOST=localhost
       APP_PORT=5010
       SQLITE_DATABASE=story.db
       TOKENIZE_SECRET=secret
       APP_PUBLIC_URL=http://localhost:5010
       TOKENIZE_AGE=3600
       STORY_DELETE_TIME_IN_HOURS=0.005
    ```
    - Instal dependencies dengan command `npm install`
    - Jalankan automation testing dengan command `npm run test`
    - Pastikan semua test berhasil.
    - Jalankan proses server dengan command `npm start`

## Cara berkontribusi
Kami sangat mengapresiasi apabila Anda berkontribusi dengan membuat API ini.
Untuk berkontribusi, silakan fork [GitHub Repository Ini](https://github.com/dicodingacademy/story-api.git)
dan submit pull request.

   
