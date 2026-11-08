import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createPost, deletePost, updatePost } from "../api/posts";
import type { UpdatePostRequest } from "../types/post";

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

export function useUpdatePostMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePostRequest) => updatePost(postId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["post", postId] }),
      ]);
      window.alert("게시글을 수정했어요.");
    },
    onError: () => {
      window.alert("게시글 수정에 실패했어요.");
    },
  });
}

export function useDeletePostMutation(postId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/posts");
    },
  });
}
