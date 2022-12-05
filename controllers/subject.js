import { validateSubject } from '../services/validation/subject';
import Subject from '../models/subject';

export default {
    async create(req, res, next) {
      const { error } = validateSubject(req.body); 
      try {
        if (error) 
          return res.send({ success: false, message: error.details[0].message });
        await new Subject({
          name: req.body.name,
          department: req.body.department,
          instructor: req.body.instructor,
          classroom: req.body.classroom,
          semester: req.body.semester
        }).save();
        res.send({ success: true, message: 'Subject created!' });
      } catch (error) {
        next(error);
      }
    },
    async getAll(req, res, next) {
      try {
        const subject = await Subject.find();
        res.status(200).send(subject);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      const { subjectId } = req.params;
      const { error } = validateSubject(req.body); 
      try {
        const subject = await Subject.findById(subjectId);
        if(!subject)
            return res.send({ success: false, message: 'No subject found with the provided id' });

        if (error) 
            return res.send({ success: false, message: error.details[0].message });

        const updateSubject = {
          name: req.body.name,
          department: req.body.department,
          instructor: req.body.instructor,
          classroom: req.body.classroom,
          semester: req.body.semester
        };
        await Subject.findByIdAndUpdate(subjectId, updateSubject, { new: true });
        res.send({ success: true, message: 'Subject updated!' });
      } catch (error) {
        next(error);
      }
    },
    async delete(req, res, next) {
      let { subjectId } = req.params;
      try {
          const subject = await Subject.findById(subjectId);
          if (!subject) 
              return res.send({ success: false, message: 'Subject not Found.' });

          await Subject.deleteOne({ _id: subjectId });
          res.status(200).send({ success: true, message: 'Subject Deleted!' });
      } catch (error) {
          next(error);
      }
    },
    async getSubject(req, res, next) {
      try {
        const subject = await Subject.findById(req.params.subjectId);
        if (!subject) 
            return res.send({ success: false, message: 'Subject not Found.' });

        res.status(200).send(subject);
      } catch (error) {
        next(error);
      }
    },
    async getUserSubject(req, res, next) {
      try {
        const filter = {
          department: req.user.department,
          classroom: req.user.classroom,
          semester: req.user.semester
        };
        const subjects = await Subject.find(filter);
        if (!subjects) 
          return res.send({ success: false, message: 'No subject found' });
        res.send({ success: true, subjects: subjects });
      } catch (error) {
        next(error);
      }
    }
}    