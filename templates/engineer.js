const engineer = (data) => {
return `<div class="card">
<h3 class="name">${data.name}</h3>
<hr>
<p class="role">Engineer</p>
<p class="id">Employee ID: ${data.id}</p>
<a class="github" href="https://github.com/${data.github}">github</a>
</div>`
}

module.exports = engineer;