'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@clerk/nextjs';

interface ReminderModalProps {
    open: boolean;
    onClose: () => void;
    learningPathId: string;
}

export function ReminderModal({ open, onClose, learningPathId }: ReminderModalProps) {
    const [reminderTime, setReminderTime] = useState('');
    const [loading, setLoading] = useState(false);
    const { getToken } = useAuth()

    const handleSetReminder = async () => {
        try {
            const token = await getToken()
            console.log(token)
            setLoading(true);
            await fetch(`http://localhost:6969/scheduler/reminder/${learningPathId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reminderTime:reminderTime }),
            });
            alert('Reminder set successfully!');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to set reminder.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Set Learning Path Reminder</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 py-2">
                    <label className="text-sm font-medium">Reminder Date & Time</label>
                    <Input
                        type="datetime-local"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading || !reminderTime} onClick={handleSetReminder}>
                        {loading ? 'Setting...' : 'Set Reminder'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
