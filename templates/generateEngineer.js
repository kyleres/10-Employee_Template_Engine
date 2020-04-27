function generateEngineer(answer) {
    return `
    <div class="column">
        <div class="card mx-3 my-3">
            <div class="card-header bg-success">
                <h3 class="card-title text-center">${answer.name}</h3>
                <h4 class="card-subtitle text-center">${answer.role}</h2>
            </div>
            <div class="card-body">
                <p><b>ID:</b> ${answer.id}</p>
                <p><b>Email:</b> ${answer.email}</p>
                <p><b>Github:</b> ${answer.github}</p>
            </div>
        </div>
    </div>
`}

module.exports = generateEngineer;