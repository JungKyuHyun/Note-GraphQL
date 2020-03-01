import gql from 'graphql-tag';

/**
 * 프래그먼트란?
 * 앞으로도 계속 재사용하고 싶은 것!
 */

export const NOTE_FRAGMENT = gql`
    fragment NotePars on Note {
        id
        title
        content
    }
`
