const baseUrl = 'https://www.digi-api.com/api/v1';
let digimon = {};
let digimonBase = {};
let nextEvolution = 0;

const search = async (name = 'Agumon', base = false) => {
    const response = await fetch(`${baseUrl}/digimon/${name}`, {
        method: 'GET',
        headers: {
            'Accept': '*/*'
        }
    });
    
    const data = await response.json()
    digimon = data;
    if (base) {
        digimonBase = digimon
    }
    document.getElementById('digivice-screen-digimon').src = data.images[0].href
}

const getText = () => {
    return document.getElementById('digivice-input').value;
}

search('Agumon', true);

document.getElementById('search').addEventListener('click', async () => {
    const name = getText();
    await search(name, true);
    nextEvolution = 0;

    document.getElementById('debug').innerHTML = digimonBase.nextEvolutions.map((evolution) => {
        return evolution.digimon
    })
});

document.getElementById('previous-digimon').addEventListener('click', () => {
    nextEvolution = 0;
    search(digimonBase.name)
});

document.getElementById('previous-evolution').addEventListener('click', () => {
    if (nextEvolution >= 0) {
        search(digimonBase.nextEvolutions[nextEvolution].digimon)
        nextEvolution--;
    }
});

document.getElementById('next-evolution').addEventListener('click', () => {
    if (digimonBase.nextEvolutions.length >= nextEvolution) {
        search(digimonBase.nextEvolutions[nextEvolution].digimon)
        nextEvolution++;
    }
});


