function generateIntern(answer) {
    return `
    <div class="column">
        <div class="card mx-3 my-3">
            <div class="card-header bg-warning">
                <h3 class="card-title text-center">${answer.name}</h3>
                <h4 class="card-subtitle text-center">${answer.role}</h2>
            </div>
            <div class="card-body">
                <p><b>ID:</b> ${answer.id}</p>
                <p><b>Email:</b> ${answer.email}</p>
                <p><b>School:</b> ${answer.school}</p>
            </div>
        </div>
    </div>
`}

module.exports = generateIntern;