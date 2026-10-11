import mongoose from 'mongoose';

const { Schema } = mongoose;

const BirthdaySchema = new Schema(
  {
    recipient: { type: String, required: true },
    title: { type: String, required: true },
    dateISO: { type: String, required: true },
    from: { type: String, required: true },
    intro: {
      bootLines: [String],
      name: String,
      status: String,
      tagline: String,
      enterLabel: String
    },
    final: {
      lines: [String],
      title: String,
      subheading: String,
      replayLabel: String,
      signature: String
    },
    easterEgg: {
      heading: String,
      body: String
    },
    tiramisu: {
      recipe: [String],
      reveal: String
    },
    letter: {
      salutation: String,
      paragraphs: [String],
      closing: String,
      signoff: String,
      from: String,
      continueLabel: String
    },
    memories: [
      {
        id: String,
        title: String,
        date: String,
        caption: String,
        tag: String,
        emoji: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Birthday', BirthdaySchema);
