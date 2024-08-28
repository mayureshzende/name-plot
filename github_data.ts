export const getGithubUserContribution = async (
  userName: string,
  o: { githubToken: string }
) => {
  const query = /* GraphQL */ `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                weekday
                date
              }
            }
          }
        }
      }
    }
  `;
  const variables = { login: userName };

  const res = await fetch("https://api.github.com/graphql", {
    headers: {
      Authorization: `bearer ${o.githubToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ variables, query }),
  });