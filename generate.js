const fs=require('fs'),path=require('path');
const code=fs.readFileSync(path.join(__dirname,'js/data.js'),'utf8');
const fn=new Function(code+'; return {JOBS,makeAv,extSvgSm};');
const {JOBS,makeAv,extSvgSm}=fn();

const dir=path.join(__dirname,'jobs');
fs.mkdirSync(dir,{recursive:true});

JOBS.forEach((j,idx)=>{
  const pb=makeAv(idx*13+2);
  const websiteLink=j.website?`<a href="${j.website}" target="_blank" style="color:#3185fc;font-size:.85rem">${j.website}</a>`:'';

  const html=`<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${j.pos} — ${j.team} | Open Roles</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <header class="nav">
    <nav class="nav-in">
      <ul class="nav-links">
        <li><a href="../index.html" class="active">Job board</a></li>
        <li><a href="#">About</a></li>
      </ul>
      <button class="btn-p">Post a job</button>
    </nav>
  </header>

  <div class="detail-wrap">
    <a href="../index.html" class="bk">&larr; 返回职位列表</a>

    <div class="dt-top">
      <div>
        <div class="dt-co">
          <div class="dt-ci" style="background:${j.c}">${j.ic}</div>
          <span class="dt-cn">${j.team} ${j.website?extSvgSm:''}</span>
        </div>
        <h1 class="dt-t">${j.pos}</h1>
      </div>
      <button class="btn-a">Apply for this position</button>
    </div>

    <div class="tags">${j.tags.map(t=>'<span class="tag">'+t+'</span>').join('')}</div>

    <div>
      <div class="mr"><div class="ml">Posted by</div><div class="mv"><div class="avs">${pb}</div></div></div>
      <div class="mr"><div class="ml">Location</div><div class="mv"><strong>${j.loc}</strong></div></div>
${j.website?`      <div class="mr"><div class="ml">Website</div><div class="mv">${websiteLink}</div></div>`:``}
    </div>

    <div class="ds">
      <div class="ml" style="margin-bottom:16px">Description</div>
      <div class="db">${j.desc}</div>
    </div>

    <div style="text-align:center;padding:48px 0 0">
      <button class="btn-a" style="padding:14px 36px;font-size:.95rem">Apply for this position</button>
    </div>
  </div>

  <footer class="ft">
    <span>&copy; 2026 Open Roles</span>
    <div style="display:flex;gap:20px"><a href="#">Privacy</a><a href="#">Terms</a></div>
  </footer>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, j.id+'.html'), html);
  console.log('✓', j.team, '—', j.pos);
});
console.log('\\nDone!', JOBS.length, 'pages generated.');
