import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";

export const defaults = {
    notes: [
        {
            __typename: "Note",
            id: 1,
            title: 'First',
            content: "Second"
        }
    ],
};
export const typeDefs = [
    `
    schema {
        query: Query
        mutation: Mutation
    }
    type Query {
        notes: [Note]!
        note(id: Int!): Note
    }
    type Mutation {
        createNote(title: String!, content: String!): Note
        editNote(id: Int!, title: String!, content: String): Note
    }
    type Note {
        id: Int!
        title: String!
        content: String!
    }
    `
];
export const resolvers = {
    Query: {
        note: (_, variables, { cache }) => { // context(3번째 인자값)에는 무엇을 넣어도 된다.
            const id = cache.config.dataIdFromObject({
                __typename: "Note", 
                id: variables.id
            });
            const note = cache.readFragment({
                fragment: NOTE_FRAGMENT, 
                id
            });
            return note;
            // return null; // 리졸버는 반드시 무언가를 리턴하는게 규칙, 그게 null이더라도!
        },
        notes: () => true
    },
    Mutation: {
        createNote: (_, variables, { cache }) => {
            const { notes } = cache.readQuery({ 
                query: GET_NOTES,
            });
            const { title, content } = variables;
            const newNote = {
                __typename: "Note",
                title,
                content,
                id: notes.length + 1,
            }
            cache.writeData({
                data: {
                    notes: [newNote, ...notes]
                }
            });
            return newNote;
        },
        editNote: (_, { id, title, content}, { cache }) => {
            const noteId = cache.config.dataIdFromObject({
                __typename: "Note", 
                id
            });
            const note = cache.readFragment({
                fragment: NOTE_FRAGMENT, 
                id: noteId,
            });
            const updateNote = {
                ...note,
                title,
                content,
            }
            cache.writeFragment({
                id: noteId,
                fragment: NOTE_FRAGMENT,
                data: updateNote
            });

            return updateNote;
        }
    }

};