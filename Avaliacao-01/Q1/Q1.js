function taxaCrescimento(populacaoA, populacaoB, taxaA, taxaB) {
    let anos = 0;
    while (populacaoA < populacaoB) {
        populacaoA *= (1 + taxaA);
        populacaoB *= (1 + taxaB);
        anos++;
    }
    return { anos, populacaoA, populacaoB };
}