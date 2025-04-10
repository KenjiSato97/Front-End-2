import random
import pandas as pd



#Função geradora de alturas (de 50 a 220 em centimentros) de 15 pessoas
def gerador_de_alturas():
    alturas = []
    for i in range(5000000):
        alturas.append(random.randint(50, 220))
    return alturas

#Função geradora de generos (M ou F) de 15 pessoas
def gerador_de_generos():
    generos = []
    for i in range(5000000):
        generos.append(random.choice(['M', 'F']))
    return generos
#Gerar um DataFrame com as alturas e generos
def gerar_dataframe():
    df = pd.DataFrame()
    df['Altura'] = gerador_de_alturas()
    df['Genero'] = gerador_de_generos()
    return df

#A maior e a menor altura do grupo:
def maior_e_menor_altura(df):
    maior = df['Altura'].max()
    menor = df['Altura'].min()
    return maior, menor



#A média de altura das pessoas do gênero Masculino:
def media_altura_masculino(df):
    media = df[df['Genero'] == 'M']['Altura'].mean()
    return round(media, 2)


#O número de pessoas do gênero Feminino:
def numero_de_femininos(df):
    numero = df[df['Genero'] == 'F'].shape[0]
    return numero


#Respostas:
df = gerar_dataframe()
print('A maior altura é:', maior_e_menor_altura(df)[0])
print('A menor altura é:', maior_e_menor_altura(df)[1])
print('A média de altura das pessoas do gênero Masculino é:', media_altura_masculino(df))   
print('O número de pessoas do gênero Feminino é:', numero_de_femininos(df))
print(df)
