"use client"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

export default function LessonsManagement() {
  const [lessons, setLessons] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [openVideoDialog, setOpenVideoDialog] = useState(false)
  const [openVideoPlayerDialog, setOpenVideoPlayerDialog] = useState(false)
  const [editingLesson, setEditingLesson] = useState(null)
  const [viewingLesson, setViewingLesson] = useState(null)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    position: "",
  })

  const API_BASE = import.meta.env.VITE_API_BASE_ADMIN || "http://localhost:27017"

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons()
    } else {
      setLessons([])
    }
  }, [selectedCourseId])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE}/courses`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to fetch courses")
      const data = await response.json()
      setCourses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const fetchLessons = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/courses/${selectedCourseId}/lessons`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to fetch lessons")
      const data = await response.json()
      setLessons(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (lesson) => {
    if (lesson) {
      setEditingLesson(lesson)
      setFormData({
        title: lesson.title,
        content: lesson.content,
        position: lesson.position,
      })
    } else {
      setEditingLesson(null)
      setFormData({
        title: "",
        content: "",
        position: lessons.length + 1,
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingLesson(null)
  }

  const handleOpenVideoDialog = (lesson) => {
    setEditingLesson(lesson)
    setSelectedFile(null)
    setOpenVideoDialog(true)
  }

  const handleCloseVideoDialog = () => {
    setOpenVideoDialog(false)
    setEditingLesson(null)
    setSelectedFile(null)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleVideoUpload = async () => {
    if (!selectedFile || !editingLesson) return

    try {
      setUploadingVideo(true)
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch(`${API_BASE}/courses/lessons/${editingLesson.id}/video`, {
        method: "PATCH",
        headers: {
          ...getAuthHeaders(),
        },
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload video")

      handleCloseVideoDialog()
      fetchLessons()
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setUploadingVideo(false)
    }
  }

  const handleSubmit = async () => {
    if (!selectedCourseId) {
      setError("Please select a course first")
      return
    }

    try {
      const url = editingLesson
        ? `${API_BASE}/courses/lessons/${editingLesson.id}`
        : `${API_BASE}/courses/${selectedCourseId}/lessons`
      const method = editingLesson ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...formData,
          position: Number(formData.position),
          course_id: selectedCourseId,
        }),
      })

      if (!response.ok) throw new Error("Failed to save lesson")

      handleCloseDialog()
      fetchLessons()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return

    try {
      const response = await fetch(`${API_BASE}/courses/lessons/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to delete lesson")
      fetchLessons()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleOpenVideoPlayer = (lesson) => {
    setViewingLesson(lesson)
    setOpenVideoPlayerDialog(true)
  }

  const handleCloseVideoPlayer = () => {
    setOpenVideoPlayerDialog(false)
    setViewingLesson(null)
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <h2 className="text-2xl font-semibold text-foreground">Lessons Management</h2>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Select Course</InputLabel>
            <Select
              value={selectedCourseId}
              label="Select Course"
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            disabled={!selectedCourseId}
            sx={{ bgcolor: "primary.main" }}
          >
            Add Lesson
          </Button>
        </Box>
      </Box>

      {!selectedCourseId ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <p className="text-muted-foreground">Please select a course to view and manage its lessons</p>
        </Paper>
      ) : loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Content</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Video</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <p className="text-muted-foreground">No lessons found. Create your first lesson!</p>
                  </TableCell>
                </TableRow>
              ) : (
                lessons.map((lesson) => (
                  <TableRow key={lesson.id} hover>
                    <TableCell>{lesson.position}</TableCell>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell>
                      <div style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {lesson.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lesson.video_url ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <span style={{ color: "#22c55e" }}>Uploaded</span>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenVideoPlayer(lesson)}
                            color="primary"
                            title="Play video"
                          >
                            <PlayArrowIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <span style={{ color: "#6b7280" }}>No video</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenVideoDialog(lesson)}
                        sx={{ mr: 1 }}
                        color="primary"
                      >
                        <CloudUploadIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleOpenDialog(lesson)} sx={{ mr: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(lesson.id)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingLesson ? "Edit Lesson" : "Add Lesson"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              fullWidth
              multiline
              rows={4}
              required
            />
            <TextField
              label="Position"
              type="number"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              fullWidth
              required
              helperText="Order in which the lesson appears"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.content || !formData.position}
          >
            {editingLesson ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openVideoDialog} onClose={handleCloseVideoDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Video for Lesson</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            {editingLesson?.video_url && <Alert severity="info">Current video: {editingLesson.video_url}</Alert>}
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
              Choose Video File
              <input type="file" hidden accept="video/*" onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Alert severity="success">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseVideoDialog}>Cancel</Button>
          <Button onClick={handleVideoUpload} variant="contained" disabled={!selectedFile || uploadingVideo}>
            {uploadingVideo ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openVideoPlayerDialog} onClose={handleCloseVideoPlayer} maxWidth="md" fullWidth>
        <DialogTitle>{viewingLesson?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {viewingLesson?.video_url && (
              <video
                controls
                style={{ width: "100%", maxHeight: "500px", backgroundColor: "#000" }}
                src={viewingLesson.video_url}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseVideoPlayer}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
