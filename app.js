
const photoInput=document.getElementById('photoInput');

photoInput?.addEventListener('change', async e=>{
 const file=e.target.files[0];
 if(!file) return;

 const img=document.createElement('img');
 img.src=URL.createObjectURL(file);
 img.style.maxWidth='100%';
 const box=document.getElementById('photoBox');
 box.innerHTML='';
 box.appendChild(img);

 try{
   const exif=await exifr.parse(file);
   document.getElementById('cameraInfo').innerText=exif?.Model||'カメラ不明';
   document.getElementById('lensInfo').innerText=exif?.LensModel||'レンズ不明';
   document.getElementById('exifInfo').innerText=JSON.stringify(exif||{});
 }catch(e){}
});

function addGear(name){
 const d=document.createElement('div');
 d.textContent=name;
 d.className='light';
 document.getElementById('assembly').appendChild(d);
}

function createLight(){
 const d=document.createElement('div');
 d.className='light';
 d.textContent='Light①';
 document.getElementById('canvas').appendChild(d);
}

function exportImage(){
 alert('v1.6ではPNG出力の土台のみ');
}
