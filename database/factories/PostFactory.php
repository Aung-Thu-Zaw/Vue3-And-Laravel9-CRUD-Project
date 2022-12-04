<?php

namespace Database\Factories;

use App\Models\Category;
use Database\Seeders\CategorySeeder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categoryID=Category::pluck("id");
        return [
            "category_id"=>$categoryID->random(),
            "title"=>$this->faker->text($maxNbChars=20),
            // "photo"=>$this->faker->image(),
            "content"=>$this->faker->paragraph(),
        ];
    }
}
