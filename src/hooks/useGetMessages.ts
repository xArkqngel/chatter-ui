import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { GetMessagesQueryVariables } from "../gql/graphql";

export const getMessagesDocument = graphql(`
  query GetMessages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables : GetMessagesQueryVariables) => {
  return useQuery(getMessagesDocument, { variables });
};

export { useGetMessages };
