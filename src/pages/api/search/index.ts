import { getPrismicClient } from "@/services/prismic";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { search } = req.body
    const trashWord = `a, à, agora, ainda, algum, alguma, 
    algumas, alguns, ampla, amplas, amplo, amplos, ante, antes, 
    ao, aos, após, aquela, aquelas, aquele, aqueles, aquilo, as, 
    até, através, cada, coisa, coisas, com, como, contra, contudo, 
    da, daquele, daqueles, das, de, dela, delas, dele, deles, depois, 
    dessa, dessas, desse, desses, desta, destas, deste, deste, destes, 
    deve, devem, devendo, dever, deverá, deverão, deveria, deveriam, 
    devia, deviam, disse, disso, disto, dito, diz, dizem, do, dos, 
    e, é, ela, elas, ele, eles, em, enquanto, entre, era, essa, essas, 
    esse, esses, esta, está, estamos, estão, estas, estava, estavam, 
    estávamos, este, estes, estou, eu, fazendo, fazer, feitos, foi, for, foram, 
    fossem, há, isso, isto, já, la, lá, lhe, lhes, lo, 
    mas, me, mesma, mesmas, mesmo, mesmos, meu, meus, minha, minhas, muita, 
    muitas, muito, muitos, na, não, nas, nem, nenhum, nessa, nessas, nesta, 
    nestas, no, nos, nós, nossa, nossas, nosso, nossos, num, numa, 
    nunca, o, os, ou, outra, outras, outro, outros, para, pela, pelas,
    pelo, pelos, per, perante, pode, pude, podendo, poder, poderia, 
    poderiam, podia, podiam, pois, por, porém, porque, posso, pouca, 
    poucas, pouco, poucos, própria, próprias, próprio, próprios, 
    quais, qual, quando, quanto, quantos, que, quem, são, se, 
    seja, sejam, sem, sempre, sendo, será, serão, seu, seus, si, 
    sido, só, sob, sobre, sua, suas, talvez, também, tampouco, 
    te, tem, tendo, tenha, ter, teu, teus, ti, tido, tinha, tinham, 
    toda, todas, todavia, todo, todos, tu, tua, tuas, tudo, um, uma, umas, 
    uns, vendo, ver, vez, vindo, vir, vos, vós`.split(', ')
    const prismic = getPrismicClient();
    const movies = await prismic.getAllByType('movies')
    if (search && req.method === "POST") {
        
        const clean: string[] = search.toLowerCase()
        .split(' ').filter((word: string)=>{
            return word && trashWord.every(trash => {
                return word !== trash
            })
        })
        
        if (clean.length === 0) {
            return res.status(204).send("Não encontrado")
        }
        const searchClean = clean.join(' ')
        
        const response = movies.filter(movie => {
            return (
            movie.data.title?.toLowerCase().includes(searchClean) || 
            movie.data.plot?.toLowerCase().includes(searchClean) ||
            movie.data.gender.some(g => g.type?.toLowerCase().includes(searchClean))
            )
        })
        
        return res.send({ movies: response })
    } else {
        res.setHeader("Allow", "POST");
        return res.status(405).end("Method not allowed")
    }
  };
  