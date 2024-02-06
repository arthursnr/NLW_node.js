import fastify  from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Poll } from '@prisma/client';
import { z } from 'zod';
import { request } from 'http';

const app = fastify();

const prisma = new PrismaClient()

app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
        title: z.string()
    })

    const { title } = createPollBody.parse(request.body)

    const poll = await prisma.poll.create({
        data: {
            title,
        }
    })

    return reply.status(201).send({ pollId: poll.id })
})

app.get('/polls', (request) => {
    console.log(request.body)

    return'Hello NLW'
})

app.delete('/polls', async (request, reply) => {
    const deletePollBody = z.object({
        id: z.string()
    });

    const { id } = deletePollBody.parse(request.body);

    try {
        const deletedPoll = await prisma.poll.delete({
            where: {
                id,
            },
        });

        reply.status(200).send({ message: 'Poll deleted successfully', poll: deletedPoll });
    } catch (error) {
        console.error('Error deleting poll:', error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
});

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})


//  FORMAS DE CONECTAR AO BANCO DE DADOS

// 1: Driver nativo
// 2: ORMs  (prisma)
