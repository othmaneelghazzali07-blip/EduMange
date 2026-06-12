<?php

namespace App\Services;

use App\Models\Seance;
use Illuminate\Validation\ValidationException;

class SchedulingService
{
    /**
     * Canonical overlap rule:
     * existing.start < new.end AND existing.end > new.start
     */
    public function findConflict(array $data, ?int $ignoreSeanceId = null): ?array
    {
        $baseQuery = Seance::query()
            ->where('date', $data['date'])
            ->when($ignoreSeanceId, function ($query) use ($ignoreSeanceId) {
                $query->where('id', '!=', $ignoreSeanceId);
            })
            ->where('heure_debut', '<', $data['heure_fin'])
            ->where('heure_fin', '>', $data['heure_debut']);

        $teacherConflict = (clone $baseQuery)
            ->where('enseignant_id', $data['enseignant_id'])
            ->first();

        if ($teacherConflict) {
            return [
                'type' => 'teacher',
                'message' => 'Conflit: cet enseignant est deja occupe dans ce creneau.',
                'seance_id' => $teacherConflict->id,
            ];
        }

        $classConflict = (clone $baseQuery)
            ->where('classe_id', $data['classe_id'])
            ->first();

        if ($classConflict) {
            return [
                'type' => 'class',
                'message' => 'Conflit: cette classe est deja occupee dans ce creneau.',
                'seance_id' => $classConflict->id,
            ];
        }

        $roomConflict = (clone $baseQuery)
            ->where('room_id', $data['room_id'])
            ->first();

        if ($roomConflict) {
            return [
                'type' => 'room',
                'message' => 'Conflit: cette salle est deja occupee dans ce creneau.',
                'seance_id' => $roomConflict->id,
            ];
        }

        return null;
    }

    public function assertNoConflict(array $data, ?int $ignoreSeanceId = null): void
    {
        $conflict = $this->findConflict($data, $ignoreSeanceId);

        if (!$conflict) {
            return;
        }

        throw ValidationException::withMessages([
            'schedule' => [$conflict['message']],
            'conflict_type' => [$conflict['type']],
        ]);
    }
}
