const manager = (data) => {
return `<div class="card">
<h3 class="name">${data.name}</h3>
<hr>
<p class="role">Manager</p>
<p class="id">Employee ID: ${data.id}</p>
<p class="office-number">Office Phone #: ${data.officeNumber}</a>
</div>`
}

module.exports = manager;