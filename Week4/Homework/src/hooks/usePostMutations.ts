import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createPost } from "../api/posts";

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async (post) => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      window.alert(`${post.author}님의 게시글을 작성했어요.`);
      navigate("/posts");
    },
    onError: () => {
      window.alert("게시글 작성에 실패했어요.");
    },
  });
}
