const intern = (data) => {
return `<div class="card">
<h3 class="name">${data.name}</h3>
<hr>
<p class="role">Intern</p>
<p class="id">Employee ID: ${data.id}</p>
<p class="school">School: ${data.school}</p>
</div>`
}

module.exports = intern;