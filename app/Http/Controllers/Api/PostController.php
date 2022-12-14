<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $orderColumn=request("order_column", "created_at");

        if (!in_array($orderColumn, ["id","title","created_at"])) {
            $orderColumn="created_at";
        }
        $orderDirection=request("order_direction", "desc");
        if (!in_array($orderDirection, ["asc","desc"])) {
            $orderDirection="desc";
        }



        $posts=Post::with("category")
        ->when(request("search_category"), function ($query) {
            $query->where("category_id", request("search_category"));
        })
        ->when(request("search_id"), function ($query) {
            $query->where("id", request("search_id"));
        })
        ->when(request("search_title"), function ($query) {
            $query->where("title", "LIKE", "%".request('search_title')."%");
        })
        ->when(request("search_content"), function ($query) {
            $query->where("content", "LIKE", "%".request('search_content')."%");
        })

        ->when(request("search_global"), function ($query, $global) {
            $query->where(function ($query) use ($global) {
                $query->where("id", $global)
                        ->orWhere("title", "LIKE", "%".$global."%")
                        ->orWhere("content", "%".$global."%");
            });
        })

        ->orderBy($orderColumn, $orderDirection)
        ->paginate(8);
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $post=Post::create($request->validated());


        if ($request->hasFile("photo")) {
            $originalPhotoName= $request->file("photo")->getClientOriginalName();

            $time=time();
            $uploadPhoto= $request->file("photo")->storeAs("/photo", $time.$originalPhotoName);

            $post->update([
                "photo"=>$uploadPhoto
            ]);
        }

        return new PostResource($post);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(Post $post, StorePostRequest $request)
    {
        $post->update($request->validated());

        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->noContent();
    }
}
