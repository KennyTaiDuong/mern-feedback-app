const mockResponse = {
  data: {
    results: [
      {
        _id: {
          $oid: "64c870dbedb470fd5dce61fb",
        },
        id: 12,
        title: "Add micro-interactions",
        category: "enhancement",
        upvotes: 71,
        status: "live",
        description: "Small animations at specific points can add delight.",
        comments: [
          {
            id: 15,
            content:
              "I'd love to see this! It always makes me so happy to see little details like these on websites.",
            user: {
              image: "./assets/user-images/image-victoria.jpg",
              name: "Victoria Mejia",
              username: "arlen_the_marlin",
            },
            replies: [
              {
                content:
                  "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
                replyingTo: "arlen_the_marlin",
                user: {
                  image: "./assets/user-images/image-suzanne.jpg",
                  name: "Suzanne Chang",
                  username: "upbeat1811",
                },
              },
            ],
          },
        ],
        upvoted: false,
        updatedAt: {
          $date: "2023-09-06T18:27:07.676Z",
        },
      },
      {
        _id: {
          $oid: "64c870dbedb470fd5dce61f2",
        },
        id: 3,
        title: "Q&A within the challenge hubs",
        category: "feature",
        upvotes: 65,
        status: "suggestion",
        description: "Challenge-specific Q&A would make for easy reference.",
        comments: [
          {
            id: 5,
            content:
              "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
            user: {
              image: "./assets/user-images/image-george.jpg",
              name: "George Partridge",
              username: "soccerviewer8",
            },
          },
        ],
        upvoted: false,
        updatedAt: {
          $date: "2023-09-06T18:27:14.339Z",
        },
      },
      {
        _id: {
          $oid: "64c870dbedb470fd5dce61fa",
        },
        id: 11,
        title: "Animated solution screenshots",
        category: "bug",
        upvotes: 9,
        status: "in-progress",
        description:
          "Screenshots of solutions with animations don’t display correctly.",
        upvoted: false,
        updatedAt: {
          $date: "2023-09-08T20:40:17.127Z",
        },
      },
    ],
  },
};

export default {
  get: vitest.fn().mockResolvedValue(mockResponse),
};
