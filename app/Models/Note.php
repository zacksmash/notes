<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Events\NoteCreated;
use App\Events\NoteUpdated;
use App\Events\NoteDeleted;

class Note extends Model
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'body_escaped'
    ];

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

    public function setBodyAttribute($value)
    {
        $this->attributes['body'] = e($value);
    }

    public function getBodyAttribute($value)
    {
        return ($value) ? htmlspecialchars_decode($value) : '';
    }

    public function getBodyEscapedAttribute()
    {
        return 'body escaped';
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
