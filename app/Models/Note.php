<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Events\NoteCreated;
use App\Events\NoteUpdated;
use App\Events\NoteDeleted;

class Note extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body', 'favorited', 'user_id'
    ];

    protected $dispatchesEvents = [
        'created'  => NoteCreated::class,
        'updated'  => NoteUpdated::class,
        'deleting' => NoteDeleted::class,
    ];

    public function setFavoritedAttribute($value)
    {
        $this->attributes['favorited'] = $value ? now() : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
