import fastify  from 'fastify';
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPollPoll } from './routes/vote-on-poll';

const app = fastify();

app.register(cookie, {
    secret: "polls-app-nlw",
    hook: 'onRequest',
    parseOptions: {}
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPollPoll)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})


//  FORMAS DE CONECTAR AO BANCO DE DADOS

// 1: Driver nativo
// 2: ORMs  (prisma)
