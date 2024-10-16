import mongoose from 'mongoose';

const SubtaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subtasks: [SubtaskSchema],
}, {
    timestamps: true,
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default Task;
