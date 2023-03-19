<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
	{
		Schema::create('users', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('title');
			$table->string('first');
			$table->string('last');
			$table->string('gender');
			$table->integer('street_number');
			$table->string('street_name');
			$table->string('city');
			$table->string('state');
			$table->string('country');
			$table->string('postcode');
			$table->string('email')->unique();
			$table->string('phone');
			$table->text('picture');
			$table->timestamps();
		});
	}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
