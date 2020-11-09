/* *** Bentuk object untuk document *** */
/* doc = {
 *  filename : Val, // dari awal
 *  konten : Val, // dari awal
 *  vektor : Val, // ditambah di tengah
 *  similarity : Val, // ditambah di tengah
 * },
 *
 * untuk menyimpan kata-kata pada query, akan digunakan suatu list of
 * strings
 * queryWords = [Q1, Q2, Q3, ...]
 */

'use strict';
const sastrawi = require('sastrawijs');

/**
 * Fungsi untuk membersikan string dari punctuation dan merapihkan kata-kata
 * (menge-stem).
 * @param {string} - string yang ingin di-stem
 * @returns {string[]} - Array yang tiap elemen adalah kata dari string yang
 * sudah di-stem
 */
const stemString = (string) => {
  // Inisialisasi stemmer, tokenizer, dan array untuk menampung strings
  let stemmed = [];
  const stemmer = new sastrawi.Stemmer();
  const tokenizer = new sastrawi.Tokenizer();

  // Mengubah string menjadi tokens lalu menge-stem-nya
  string = tokenizer.tokenize(string);
  for (const word of string) {
    stemmed.push(stemmer.stem(word));
  }

  return stemmed;
};

/**
 * Fungsi untuk membersikan string dari stopwords dalam bahasa Indonesia
 * @param {string} - string yang ingin di-stopword
 * @returns {string[]} - Array yang tiap elemen adalah kata dari string yang sudah dihilangkan stopwordsnya.
 */
const remove_stopwords = (string) => {
  stopwords = ['ada','adanya','adalah','adapun','agak','agaknya','agar','akan','akankah','akhirnya','aku','akulah','amat','amatlah','anda','andalah','antar','diantaranya','antara','antaranya','diantara','apa','apaan','mengapa','apabila','apakah','apalagi','apatah','atau','ataukah','ataupun','bagai','bagaikan','sebagai','sebagainya','bagaimana','bagaimanapun','sebagaimana','bagaimanakah','bagi','bahkan','bahwa',' bahwasanya','sebaliknya','banyak','sebanyak','beberapa','seberapa','begini','beginian','beginikah','beginilah',' sebegini','begitu','begitukah','begitulah','begitupun','sebegitu','belum','belumlah','sebelum','sebelumnya','sebenarnya','berapa',' berapakah','berapalah','berapapun','betulkah','sebetulnya','biasa','biasanya','bila','bilakah','bisa','bisakah','sebisanya',' boleh',' bolehkah',' bolehlah',' buat',' bukan',' bukankah',' bukanlah',' bukannya',' cuma',' percuma',' dahulu',' dalam',' dan',' dapat',' dari',' daripada',' dekat',' demi',' demikian',' demikianlah',' sedemikian',' dengan',' depan',' di',' dia',' dialah',' dini',' diri',' dirinya',' terdiri',' dong',' dulu',' enggak',' enggaknya',' entah',' entahlah',' terhadap',' terhadapnya',' hal',' hampir',' hanya',' hanyalah',' harus',' haruslah',' harusnya',' seharusnya',' hendak',' hendaklah',' hendaknya',' hingga',' sehingga',' ia',' ialah',' ibarat',' ingin',' inginkah',' inginkan',' ini',' inikah',' inilah',' itu',' itukah',' itulah',' jangan',' jangankan',' janganlah',' jika',' jikalau',' juga',' justru',' kala',' kalau',' kalaulah',' kalaupun',' kalian',' kami',' kamilah',' kamu',' kamulah',' kan',' kapan',' kapankah',' kapanpun',' dikarenakan',' karena',' karenanya',' ke',' kecil',' kemudian',' kenapa',' kepada',' kepadanya',' ketika',' seketika',' khususnya',' kini',' kinilah',' kiranya',' sekiranya',' kita',' kitalah',' kok',' lagi',' lagian',' selagi',' lah',' lain',' lainnya',' melainkan',' selaku',' lalu',' melalui',' terlalu',' lama',' lamanya',' selama',' selama',' selamanya',' lebih',' terlebih',' bermacam',' macam',' semacam',' maka',' makanya',' makin',' malah',' malahan',' mampu',' mampukah',' mana',' manakala',' manalagi',' masih',' masihkah',' semasih',' masing',' mau',' maupun',' semaunya',' memang',' mereka',' merekalah',' meski',' meskipun',' semula',' mungkin',' mungkinkah',' nah',' namun',' nanti',' nantinya',' nyaris',' oleh',' olehnya',' seorang',' seseorang',' pada',' padanya',' padahal',' paling',' sepanjang',' pantas',' sepantasnya',' sepantasnyalah',' para',' pasti',' pastilah',' per',' pernah',' pula',' pun',' merupakan',' rupanya',' serupa',' saat',' saatnya',' sesaat',' saja',' sajalah',' saling',' bersama',' sama',' sesama',' sambil',' sampai',' sana',' sangat',' sangatlah',' saya',' sayalah',' se',' sebab',' sebabnya',' sebuah',' tersebut',' tersebutlah',' sedang',' sedangkan',' sedikit',' sedikitnya',' segala',' segalanya',' segera',' sesegera',' sejak',' sejenak',' sekali',' sekalian',' sekalipun',' sesekali',' sekaligus',' sekarang',' sekarang',' sekitar',' sekitarnya',' sela',' selain',' selalu',' seluruh',' seluruhnya',' semakin',' sementara',' sempat',' semua',' semuanya',' sendiri',' sendirinya',' seolah',' seperti',' sepertinya',' sering','seringnya','serta','siapa','siapakah','siapapun','disini','disinilah','sini','sinilah','sesuatu','sesuatunya','suatu','sesudah','sesudahnya','sudah','sudahkah','sudahlah','supaya','tadi','tadinya','tak','tanpa','setelah','telah','tentang','tentu','tentulah','tentunya','tertentu','seterusnya','tapi','tetapi','setiap','tiap','setidaknya','tidak','tidakkah','tidaklah','toh','waduh','wah','wahai','sewaktu','walau','walaupun','wong','yaitu','yakni','yang'] 
  hasil = []
  kata = string.split('')
  for(i=0;i<kata.length;i++) {
    katabersih = kata[i].split(".").join("")
    if(!stopwords.includes(katabersih)) {
        hasil.push(katabersih)
    }
 }
 return(hasil.join(' '))
};
/**
 * Fungsi untuk mengubah menjadi javascript object.
 * Javascript object memiliki kata dalam string sebagai key dan
 * jumlah kemunculan kata dalam string sebaga value.
 * @param {string} query - String yang ingin diubah menjadi javascript object.
 * @returns {object} Object JS berisi string dan kemunculannya pada query.
 */
const toObj = (query) => {
  let obj = {};
  // Nge-stem string dulu
  const stemmedQuery = stemString(query);

  // Masukan kata-kata ke object
  for (const i in stemmedQuery) {
    let word = stemmedQuery[i];
    // Kalo belom ada di obj jadi 1, kalo udh ada ditambah 1
    obj[word] = word in obj ? obj[word] + 1 : 1;
  }

  return obj;
};

/**
 * Fungsi untuk menge-sort similarity dari object-object dokumen pada suatu list
 * of objects. Property similarity akan disort secara descending dari besar
 * ke kecil.
 * @param {object[]} - list of objects yang akan di-sort similarity-nya
 * @returns void
 */
const sortSimilaritiesDsc = (arrObj) => {
  arrObj.sort((a, b) => b.similarity - a.similarity);
};

/* -- untuk nguji fungsi sort similarity -- */
/*
const doc1 = {
  filename: '../tmpDocs/doc1.txt',
  konten: 'Perekonomian Indonesia',
  vektor: [1, 1, 0, 0, 0],
  similarity: 0.865,
};

const doc2 = {
  filename: '../tmpDocs/doc2.html',
  konten: 'Perekonomian Indonesia meningkat',
  vektor: [1, 1, 1, 0, 0],
  similarity: 0.9,
};

const list = [doc1, doc2];
console.log(list);
sortSimilaritiesDsc(list);
console.log(list);
*/

exports.toObj = toObj;
